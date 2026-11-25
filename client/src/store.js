export const instagramUrl = 'https://www.instagram.com/paras_4329/';
export const whatsappChannelUrl = 'https://whatsapp.com/channel/0029Vb7pEvZGpLHY2y2PK43h';
export const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=Paras+Sarees+4329+Gali+Bhairon+Wali+Jogiwara+Nai+Sarak+Delhi+110006';
export const shopEmail = 'parassarees4329@gmail.com';

export const phoneNumbers = [
  { label: '+91 88006 32535', href: 'tel:+918800632535' },
  { label: '+91 99104 74665', href: 'tel:+919910474665' },
];

export function enquiryUrl(product) {
  const message = product
    ? `Hello Paras Sarees, please share the price and availability for the ${product.name}. I saw it here: ${product.source.url}`
    : 'Hello Paras Sarees, please share your latest saree and lehenga catalog and wholesale prices.';

  return `https://wa.me/918800632535?text=${encodeURIComponent(message)}`;
}

export function shortlistEnquiryUrl(items) {
  const pieces = items.map(({ product, quantity }) => (
    `- ${product.name} × ${quantity} (${product.source.url})`
  ));
  const message = [
    'Hello Paras Sarees, I would like wholesale prices and availability for these designs.',
    '',
    ...pieces,
    '',
    'Please let me know the minimum order quantity and delivery options.',
  ].join('\n');

  return `https://wa.me/918800632535?text=${encodeURIComponent(message)}`;
}
