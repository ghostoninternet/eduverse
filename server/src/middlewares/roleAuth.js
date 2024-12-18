const roleAuth = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const hasAllowedRole = allowedRoles.includes(req.user.role);
    if (!hasAllowedRole) {
      return res.status(403).json({ 
        message: "You don't have permission to perform this action" 
      });
    }

    next();
  };
};

export default roleAuth;