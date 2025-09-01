import { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    description: 'Organize products by brand.',
  },
  access: {
    read: () => true, // Everyone can read brands
  },
  fields: [
    {
      name: 'name',
      label: 'Brand Name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
