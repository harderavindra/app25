// utils/seed.js
import bcrypt from 'bcryptjs';
import Tenant from '../models/Tenant.js';
import User from '../models/User.js';

export const seedDefaultTenantAndAdmin = async () => {
  const defaultTenantName = process.env.DEFAULT_TENANT_NAME || 'CreativeOps Ltd';

  // 1. Seed Default Tenant
  let tenant = await Tenant.findOne({ companyName: defaultTenantName });

  if (!tenant) {
    tenant = await Tenant.create({
      companyName: defaultTenantName,
      region: process.env.DEFAULT_TENANT_REGION || 'Global',
      plan: 'basic',
      isActive: true
    });
    console.log(` Created default tenant: ${tenant.companyName}`);
  } else {
    console.log(` Tenant already exists: ${tenant.companyName}`);
  }

  // 2. Seed Default Admin
  const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@creativeops.ai';

  const existingAdmin = await User.findOne({ email: defaultAdminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(
      process.env.DEFAULT_ADMIN_PASSWORD || 'securePassword123',
      10
    );

    const adminUser = await User.create({
      tenantId: tenant._id,
      firstName: process.env.DEFAULT_ADMIN_NAME || 'Admin',
      lastName: '',
      email: defaultAdminEmail,
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    console.log(` Created default admin user: ${adminUser.email}`);
  } else {
    console.log(` Admin user already exists: ${existingAdmin.email}`);
  }

  return tenant;
};
