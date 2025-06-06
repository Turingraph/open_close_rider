###############################################################################################################

import os
import sys

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
parent = os.path.dirname(parent)
parent = os.path.dirname(parent)
sys.path.append(parent)

###############################################################################################################

from basic_ocr.basic_ocr import get_ocr, get_table_img, get_threshold_img

path = parent + "/tests/examples/powder_01/img/img.jpg"

img = get_threshold_img(
    image=path,
    save_path="img/thresh.jpg",
    abs_path_input=True
)

img_box = get_table_img(
    image=img.img,
    min_x=300,
    min_h=500,
    max_h=1000,
)

img_box.add_width(area=75, index=0)
img_box.add_x(area=-10, index=0)
img_box.col_half(index=0, is_double=True)
img_box.as_ocr_box_reader().save_ith_img(path="img/middle.jpg",index=1,rgb=None)
# img_box.as_ocr_box_reader().show_img()

target = img_box.as_ocr_box_reader().get_many_imgs()[1]

get_ocr(
    image=target,
    psm=11,
    # conf=50,
    save_path_img = "img/mark.jpg",
    lang="eng+tha",
)
