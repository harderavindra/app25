// middleware/enforceTenant.js
export const enforceTenant = (modelKey = 'tenantId') => {
  return (req, res, next) => {
    req.tenantFilter = { [modelKey]: req.user.tenantId };
    next();
  };
};
