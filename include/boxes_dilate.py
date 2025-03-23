import copy

import cv2
import numpy as np

from img_process.contour import get_contours
from img_process.utility import check_img, get_size, rgb_img
from include.img_process_gray import img_process_gray
from include.img_process_rgb import img_process_rgb

'''
Purpose
-   Transform image as dilated image to get the text format data without using ML model.

Attribute

NAME        TYPE                DESCRIPTION
origin_img  img_process_rgb     original img image
marked_img  img_process_rgb     origin_img with the images of boxes (self.boxes)
dilate_img  img_process_gray    dilate image for getting the format of the text
all_boxes   tuple               array of all boxes generated by get_contours(img=self.dilate_img.img)
boxes       list                selected boxes from all_boxes, filtered by select_boxes
'''

class boxes_dilate:
    def __init__(self, 
                img: np.ndarray | str,
                thresh_px: int = 0,
                kernel: np.ndarray = np.ones(shape=(2, 30)),
                ksize: int = 9):
        if type(img) == str:
            img:np.ndarray = cv2.imread(filename=img)
            if img is None:
                raise ValueError(f"Error: The file at path '{img}' could not be loaded.")
        elif type(img) == np.ndarray:
            img:np.ndarray = check_img(img)
        else:
            raise TypeError("Error: Input img must be img_process, np.ndarray or str")
        self.origin_img:img_process_rgb = img_process_rgb(img = rgb_img(img))
        self.marked_img:img_process_rgb = copy.deepcopy(self.origin_img)
        img:img_process_gray = img_process_gray(img=img)
        img.contour_img(
            thresh_px=thresh_px,
            kernel=kernel,
            ksize=ksize)
        self.dilate_img:img_process_gray = img
        self.all_boxes:list = get_contours(img=self.dilate_img.img)
        self.boxes = []

#-----------------------------------------------------------------------------------------
    # TITLE : CREATE AND SELECT BOX
    # (x, y, width, height) = (arr[i-1].x, arr[i-1].y, arr[i].x - arr[i-1].x, arr[i].y- arr[i-1].y)

    # Update dilate_img using img_process_gray.contour_img method
    def update_dilate_img(self,                
                thresh_px: int = 0,
                kernel: np.ndarray = np.ones(shape=(2, 30)),
                ksize: int = 9) -> None:
        self.marked_img = copy.deepcopy(self.origin_img)
        img = img_process_gray(img = copy.deepcopy(self.origin_img.img))
        img = img_process_gray(img=img)
        img.contour_img(
            thresh_px=thresh_px,
            kernel=kernel,
            ksize=ksize)
        self.dilate_img = img
        self.all_boxes = get_contours(img=self.dilate_img.img)
        self.boxes = []

    # Get selected box as self.boxes from self.all_boxes filtered by this function.
    def select_boxes(
            self, 
            min_x:int = 0,
            max_x:int|None = None,
            min_y:int = 0,
            max_y:int|None = None,
            min_w:int = 0,
            max_w:int|None = None,
            min_h:int = 0,
            max_h:int|None = None,
            ) -> None:
        min_x = get_size(size=min_x, maxval=self.marked_img.img.shape[1])
        min_y = get_size(size=min_y, maxval=self.marked_img.img.shape[0])
        max_x = get_size(size=max_x, maxval=self.marked_img.img.shape[1],default_size=self.marked_img.img.shape[1])
        max_y = get_size(size=max_y, maxval=self.marked_img.img.shape[0],default_size=self.marked_img.img.shape[0])

        min_w = get_size(size=min_w, maxval=self.marked_img.img.shape[1])
        min_h = get_size(size=min_h, maxval=self.marked_img.img.shape[0])
        max_w = get_size(size=max_w, maxval=self.marked_img.img.shape[1],default_size=self.marked_img.img.shape[1])
        max_h = get_size(size=max_h, maxval=self.marked_img.img.shape[0],default_size=self.marked_img.img.shape[0])

        self.all_boxes = get_contours(img=self.dilate_img.img)
        self.boxes = []
        for i in self.all_boxes:
            if (
                (i[0] > min_x and i[0] < max_x) and 
                (i[1] > min_y and i[1] < max_y) and 
                (i[2] > min_w and i[2] < max_w) and 
                (i[3] > min_h and i[3] < max_h)
                ):
                self.boxes.append(i)
