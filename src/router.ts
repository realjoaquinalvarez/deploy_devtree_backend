import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, login, getUser, updateProfile, uploadImage, getUserByHandle, searchByHandle } from './handlers';
import { handleInputErrors } from './middleware/validations';
import { authenticate } from './middleware/auth';

const router = Router();

router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El name no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('El email no es valido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('El password debe tener al menos 8 caracteres'),
    handleInputErrors,
    createAccount);

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El email no es valido'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    login)

router.get('/user', authenticate, getUser)
router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    handleInputErrors,
    authenticate,
    updateProfile
)

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    handleInputErrors,
    searchByHandle
)

export default router;

