import { body, validationResult } from 'express-validator';
import sanitizeHtml from 'sanitize-html';

// Middleware array for validation + sanitization
export const validateBooking = [
  body('eventId')
    .isInt({ min: 0})
    .withMessage('Valid event ID is required'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .customSanitizer(name => sanitizeHtml(name)),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail()
    .customSanitizer(email => sanitizeHtml(email)),

  // Middleware to return validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
