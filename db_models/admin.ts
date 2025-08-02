import mongoose, { Schema } from 'mongoose';
import User from './user.ts';

// Схема флагов администратора
const StaffFlagsSchema = new Schema({
    inVanishMode: Boolean,
    isSuperAdmin: Boolean,
    telegram: {
        canManageBot: Boolean,
    },
    discord: {
        canManageBot: Boolean,
    },
    web: {
        canManageSite: Boolean,
        canUpdateFrontend: Boolean,
        canUpdateBackend: Boolean,
        canPostIntoNews: Boolean,
        canPostIntoBlog: Boolean,
        canManageUsers: Boolean,
    },
    canUseAIWithoutLimits: Boolean,
    canManageAIModels: Boolean,
    canChangeSiteInRealTime: Boolean,
}, { _id: false });

// Схема "легендарных подвигов" администратора
const StaffLegendsInfoSchema = new Schema({
    providedAdminSocks: Boolean,
    hasIRLGirlfriend: Boolean,
    copyPastedCode: Boolean,
    resuscitatedDeadServer: Boolean,
    holdsCryptoFatWallet: Boolean,
    deployedAfterFridayAndSurvived: Boolean,
    spokeWithBigWigs: Boolean,
}, { _id: false });

// Создаём Staff схему на основе User.schema.obj
const StaffSchema = new Schema({
    ...User.schema.obj,
    staffId: { type: String, required: true, unique: true },
    permissionLevel: { type: Number, required: true, default: 0 },
    whenPromoted: { type: Date, required: true },
    promotedBy: { type: String, required: true },
    staffFlags: { type: StaffFlagsSchema, default: {} },
    staffLegendsInfo: { type: StaffLegendsInfoSchema, default: {} }
}, { timestamps: true });

StaffSchema.index({ staffId: 1 }, { unique: true });
StaffSchema.index({ permissionLevel: 1 });

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema, 'staff');