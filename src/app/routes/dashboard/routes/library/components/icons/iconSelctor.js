import EXCEL from "assets/images/file-type/xls.png";
import JPG from "assets/images/file-type/jpg.png";
import MP3 from "assets/images/file-type/mp3.png";
import PDF from "assets/images/file-type/pdf.png";
import PNG from "assets/images/file-type/png.png";
import PPOINT from "assets/images/file-type/ppt.png";
import TXT from "assets/images/file-type/txt.png";
import DOC from "assets/images/file-type/doc.png";
import ZIP from "assets/images/file-type/zip.png";
import SVG from "assets/images/file-type/svg.png";
import File from "assets/images/file.png";

import * as R from "ramda";

export default function iconSelector(mimeType) {
  const keyToIcon = {
    "image/png": PNG,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": EXCEL,
    "image/jpeg": JPG,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": DOC,
    "audio/mpeg": MP3,
    "application/pdf": PDF,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": PPOINT,
    "text/plain": TXT,
    "application/x-zip-compressed": ZIP,
    "image/svg+xml": SVG,
    "application/octet-stream": ZIP
  };

  return R.propOr(File, mimeType)(keyToIcon);
}
