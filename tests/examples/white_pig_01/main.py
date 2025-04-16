###############################################################################################################

import os
import sys

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
parent = os.path.dirname(parent)
parent = os.path.dirname(parent)
sys.path.append(parent)

###############################################################################################################

from basic_ocr.basic_ocr import get_ocr, get_threshold_img

path = parent + "/tests/examples/white_pig_01/img/img.jpg"

img = get_threshold_img(
    image=path,
    save_path="img/thresh.jpg"
)

get_ocr(
    image=img.img,
    # save_path_img = "img/mark.jpg",
    lang="eng+tha",
)

print("CONGRATULATIONS ! CODING FILES WORKS AS EXPECTED !")
