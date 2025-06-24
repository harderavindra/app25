import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Create a new user (admin-only)
export const createUser = async (req, res, next) => {
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
   } catch (err) {
     next(err);
  }
};


export const getUsers = async (req, res,next) => {
    try {
        const { search, roles, teams } = req.query;
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
        if( teams ) {
            const teamArray = Array.isArray(teams) ? teams : [teams];
            filter.team = { $in: teamArray };
        }

        const users = await User.find(filter).sort({ createdAt: -1 });
        res.json({ users });
     } catch (err) {
     next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password, // optional
    role,
    department,
    team,
    region,
  } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.role = role || user.role;
    user.department = department || user.department;
    user.team = team || user.team;
    user.region = region || user.region;

    // Optional: update password if provided
    if (password && password.trim().length > 0) {
      user.password = password; // make sure hashing is handled in pre-save hook
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully.', user });
   } catch (err) {
     next(err);
  }
};


// Delete a user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Optional: check if user exists first
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
     next(err);
  }
};