import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    description: 'Manage all computer hardware products.',
  },
  access: {
    read: () => true, // Everyone can read products
  },
  fields: [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Product Description',
      type: 'richText',
    },
    {
      name: 'sku',
      label: 'SKU (Stock Keeping Unit)',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'price',
      label: 'Price (HT - Hors Taxes)',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'stock',
      label: 'Stock Quantity',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'featured',
      label: 'Featured Product',
      type: 'checkbox',
      defaultValue: false,
    },
    // Relationships
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false, // A product has one primary category
    },
    {
      name: 'brand',
      label: 'Brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
      hasMany: false, // A product has one brand
    },
    {
      name: 'images',
      label: 'Product Images',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      hasMany: true, // A product can have multiple images
    },
  ],
}
