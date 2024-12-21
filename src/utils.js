

// utils.js
export function GA4Function(items, type, funcs) {

    console.log(items);
    const TotalPrice = items.reduce((accumulator, item) => accumulator + (parseInt((item.price ?item.price :item.plan.price) * (item.quantity?(item.quantity ?item.quantity :item.plan.quantity):1), 0)), 0);

     funcs(() => {
        console.log(type);
        // window.dataLayer.push({ ecommerce: null });
          window.dataLayer.push({
            event: type,
            ecommerce: {
              currency: 'NGN',
              value: TotalPrice,
              coupon: '',
              items:items.map((item) => ({
                  item_id: item.id,
                  item_name: item.name,
                  affiliation: "",
                  coupon: "",
                  discount: item.old_price-item.plan.price,
                  index: 0,
                  item_brand: "",
                  item_category: "",
                  item_variant: item.selected_color,
                  location_id: "",
                  price: item.price ?item.price :item.plan.price,
                  quantity:item.quantity ?(item.quantity ?item.quantity :item.plan.quantity) :"",
          }))
            }
          });
        });
}
