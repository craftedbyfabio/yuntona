#!/bin/bash
# Yuntona video optimisation for Netlify
# Combines your profile/unsharp/aspect-preservation with sensible resolution targets

VIDEOS=("hero-search" "search-by-risk" "knowledge-graph")
OUT="./videos"
mkdir -p "$OUT"

for NAME in "${VIDEOS[@]}"; do
  SRC=$(ls ./source/${NAME}.* 2>/dev/null | head -1)

  if [ -z "$SRC" ] || [ ! -f "$SRC" ]; then
    echo "⚠ Missing source for ${NAME} — skipping"
    continue
  fi

  echo "▶ Processing ${NAME} from ${SRC}..."

  # ─── Desktop MP4 (H.264, 1280×720) ────────────────────────
  ffmpeg -y -i "$SRC" \
    -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,unsharp=5:5:0.8:3:3:0.4" \
    -c:v libx264 -preset slow -crf 22 -profile:v high -level 4.0 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    "$OUT/${NAME}.mp4"

  # ─── Desktop WebM (VP9, 1280×720) ─────────────────────────
  ffmpeg -y -i "$SRC" \
    -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,unsharp=5:5:0.8:3:3:0.4" \
    -c:v libvpx-vp9 -crf 30 -b:v 0 \
    -row-mt 1 -deadline good \
    -an \
    "$OUT/${NAME}.webm"

  # ─── Mobile MP4 (H.264, 640×360) ──────────────────────────
  ffmpeg -y -i "$SRC" \
    -vf "scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2,unsharp=5:5:0.8:3:3:0.4" \
    -c:v libx264 -preset slow -crf 24 -profile:v main -level 3.1 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    "$OUT/${NAME}-mobile.mp4"

  # ─── Mobile WebM (VP9, 640×360) ───────────────────────────
  ffmpeg -y -i "$SRC" \
    -vf "scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2,unsharp=5:5:0.8:3:3:0.4" \
    -c:v libvpx-vp9 -crf 33 -b:v 0 \
    -row-mt 1 -deadline good \
    -an \
    "$OUT/${NAME}-mobile.webm"

  # ─── Poster JPG (first frame, desktop resolution) ─────────
  ffmpeg -y -i "$SRC" \
    -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=#07070a,select=eq(n\,0)" \
    -vframes 1 -q:v 3 \
    "$OUT/${NAME}.jpg"

  echo "✓ ${NAME} complete"
  ls -lh "$OUT/${NAME}"* | awk '{print "  " $5 "  " $9}'
  echo ""
	done
