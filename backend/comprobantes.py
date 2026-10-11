"""Comprobante de compra: snapshot + PDF liviano (stdlib, sin Chromium)."""
from __future__ import annotations

import os
from datetime import datetime
from zoneinfo import ZoneInfo

from pagos_mp import _sb

TZ = ZoneInfo("America/Argentina/Buenos_Aires")
LEYENDA = "Comprobante de compra – no válido como factura"


def _env(name: str, default: str = "") -> str:
    return os.getenv(name, default)


def tienda() -> dict:
    return {
        "nombre": _env("TIENDA_NOMBRE", ""),
        "cuit": _env("TIENDA_CUIT", ""),
        "direccion": _env("TIENDA_DIRECCION", ""),
        "email": _env("TIENDA_EMAIL", ""),
        "telefono": _env("TIENDA_TELEFONO", ""),
    }


def obtener_comprobante(orden_id: str) -> dict | None:
    # Esquema vigente 006_checkout_servidor (006): comprobantes guarda solo
    # totales en centavos; las líneas se leen de orden_items + productos.
    filas = _sb("comprobantes",
                query=(f"?orden_id=eq.{orden_id}&select=*,ordenes(nombre,email,direccion,ciudad,"
                       "codigo_postal,envio,subtotal_centavos,costo_envio_centavos,total_centavos,"
                       "acceso_token,created_at)"))
    if not filas:
        return None
    c = filas[0]
    try:
        items = _sb("orden_items",
                    query=f"?orden_id=eq.{orden_id}&select=cantidad,precio,productos(nombre)")
    except Exception:
        items = []
    lineas = []
    for it in items or []:
        prod = it.get("productos") or {}
        nombre = prod.get("nombre", "") if isinstance(prod, dict) else ""
        lineas.append({"cantidad": it.get("cantidad", 1), "nombre": nombre,
                       "precio_unitario": int(it.get("precio") or 0)})
    c["items_snapshot"] = lineas
    return c


def _pdf_minimo(lineas: list[str]) -> bytes:
    """Genera un PDF 1.x valido con texto (Courier 10). Sin dependencias."""
    objs: list[bytes] = []
    contenido = "BT /F1 10 Tf 40 780 Td 13 TL " + "".join(
        f"({l.replace(chr(92), '/').replace('(', '[').replace(')', ']')}) Tj T* "
        for l in lineas) + "ET"
    objs.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    objs.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    objs.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] "
                b"/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>")
    objs.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>")
    objs.append(b"<< /Length %d >>\nstream\n" % len(contenido.encode("latin-1", "replace"))
                + contenido.encode("latin-1", "replace") + b"\nendstream")
    out = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for i, o in enumerate(objs, 1):
        offsets.append(len(out))
        out += f"{i} 0 obj\n".encode() + o + b"\nendobj\n"
    xref = len(out)
    out += f"xref\n0 {len(objs)+1}\n0000000000 65535 f \n".encode()
    for off in offsets[1:]:
        out += f"{off:010d} 00000 n \n".encode()
    out += (f"trailer\n<< /Size {len(objs)+1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF").encode()
    return bytes(out)


def comprobante_pdf(c: dict) -> bytes:
    t = tienda()
    o = c.get("ordenes", {}) if isinstance(c.get("ordenes"), dict) else {}
    fecha = c.get("emitida_at") or c.get("created_at") or ""
    try:
        fecha = datetime.fromisoformat(fecha).astimezone(TZ).strftime("%d/%m/%Y %H:%M")
    except Exception:
        pass
    subtotal = int(o.get("subtotal_centavos", 0)) / 100
    envio = int(o.get("costo_envio_centavos", 0)) / 100
    total = int(o.get("total_centavos", 0)) / 100
    lineas = [
        f"{t['nombre'] or 'PixTech'}",
        f"CUIT: {t['cuit'] or '-'}  |  {t['direccion'] or ''}",
        f"{t['email'] or ''}  {t['telefono'] or ''}",
        "=" * 58,
        f"COMPROBANTE {str(c.get('id', ''))[:8].upper()}",
        f"Fecha (Bs.As.): {fecha}",
        f"Cliente: {o.get('nombre', '')}",
        f"{o.get('direccion', '')}, {o.get('ciudad', '')} CP {o.get('codigo_postal', '')}",
        "-" * 58,
    ]
    for it in c.get("items_snapshot", []) or []:
        lineas.append(f"{it.get('cantidad',1)}x {str(it.get('nombre',''))[:36]:36} ${int(it.get('precio_unitario',0)):>9,}".replace(",", "."))
    lineas += [
        "-" * 58,
        f"Subtotal: ${subtotal:>,.0f}".replace(",", "."),
        f"Envio ({o.get('envio','')}): ${envio:>,.0f}".replace(",", "."),
        f"TOTAL: ${total:>,.0f}".replace(",", "."),
        "=" * 58,
        LEYENDA,
        f"Verificacion: {_env('FRONTEND_URL', '')}/pedido/{c.get('orden_id','')}?token={o.get('acceso_token','')}",
    ]
    return _pdf_minimo(lineas)
