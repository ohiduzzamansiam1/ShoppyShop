export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      type: 'text',
      title: 'Product Description',
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Product Category',
      to: [{type: 'category'}],
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Product Rating',
    },
    {
      name: 'totalRatings',
      type: 'number',
      title: 'Total Product Ratings',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'price',
      type: 'number',
      title: 'Product Price',
    },
    {
      name: 'discountPercentage',
      type: 'number',
      title: 'Discount Percentage',
    },
  ],
}
