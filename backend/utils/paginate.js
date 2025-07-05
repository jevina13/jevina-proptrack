// Build MongoDB filter query from request params
export const buildFilterQuery = (filters) => {
    const query = { isActive: true };
    if (filters.minPrice) query.price = { $gte: Number(filters.minPrice) };
    if (filters.maxPrice) query.price = { ...query.price, $lte: Number(filters.maxPrice) };
    if (filters.location) query.location = new RegExp(filters.location, 'i');
    if (filters.type) query.type = filters.type;
    if (filters.bedrooms) query.bedrooms = { $gte: Number(filters.bedrooms) };
    if (filters.amenities) query.amenities = { $in: filters.amenities.split(',') };
    return query;
  };
  
  // Generate pagination metadata
  export const paginateResults = (page, limit, total) => ({
    page: Number(page),
    limit: Number(limit),
    total,
    pages: Math.ceil(total / limit)
  });