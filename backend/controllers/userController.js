import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Create a new user (admin-only)
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, department, team, region } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      tenantId: req.user.tenantId, // Use the same tenant as current admin
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'user',
      department,
      team,
      region,
      isActive: true
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: `${user.firstName} ${user.lastName || ''}`.trim()
      }
    });
  } catch (error) {
    console.error('User creation error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const getUsers = async (req, res) => {
    try {
        const { search, roles } = req.query;
        const filter = {};

        // Search: firstName, lastName, or email
        if (search) {
            const regex = new RegExp(search, "i"); // case-insensitive
            filter.$or = [
                { firstName: regex },
                { lastName: regex },
                { email: regex },
            ];
        }

        // Role filter
        if (roles) {
            const roleArray = Array.isArray(roles) ? roles : [roles];
            filter.role = { $in: roleArray };
        }

        const users = await User.find(filter).sort({ createdAt: -1 });
        res.json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error" });
    }
};