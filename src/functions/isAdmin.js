const adminId = import.meta.env.VITE_ADMIN_ID;
const adminId2 = import.meta.env.VITE_ADMIN2_ID;

export function isAdmin({ isAuthenticated, user }) {
  if (!isAuthenticated || !user || !user.sub) {
    return false;
  } else {
    if (user.sub === adminId || user.sub === adminId2) {
      return true;
    }
  }
  return false;
}
