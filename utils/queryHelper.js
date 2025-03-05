// Helper to apply tenant context to database queries
const applyTenantContext = (query, req) => {
  if (req.tenantId) {
    return query.where('tenant').equals(req.tenantId);
  }
  return query;
};

module.exports = { applyTenantContext };
