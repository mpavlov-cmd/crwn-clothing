import {CategoryItem} from "../categories/categories.types";

export enum CART_ACTION_TYPES {
    TRIGGER_CART_OPEN = 'cart/TRIGGER_CART_OPEN',
    MODIFY_CART_CONTENTS = 'cart/MODIFY_CART_CONTENTS',
}

export  type CartItem = CategoryItem & {
    quantity: number;
}