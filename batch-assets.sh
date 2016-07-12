#!/bin/bash
OUTPUT_SIZES="16 19 32 38 48 64 128"

for size in $OUTPUT_SIZES
do
  inkscape -z -f assets/icon-inactive.svg -w${size} -e images/icon-inactive${size}.png
  inkscape -z -f assets/icon-active.svg -w${size} -e images/icon-active${size}.png
  inkscape -z -f assets/cursor.svg -w${size} -e images/cursor${size}.png
done
