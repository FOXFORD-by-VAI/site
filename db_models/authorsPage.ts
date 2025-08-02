
import mongoose, { Schema, Document } from 'mongoose';

export interface ISocial {
	name: string;
	url: string;
	icon?: string;
}

export interface IAuthorStats {
	commits?: number | string;
	projects?: number | string;
	gifts?: number | string;
	nfts?: number | string;
	age?: string | Date | number;
	messages?: number | string;
	warnings?: number | string;
}

export interface IAuthor extends Document {
	name: string;
	role: string;
	quote: string;
	avatar: string;
	socials: ISocial[];
	tags: string[];
	stats: IAuthorStats;
}

const SocialSchema = new Schema<ISocial>({
	name: { type: String, required: true },
	url: { type: String, required: true },
	icon: { type: String },
}, { _id: false });

const AuthorStatsSchema = new Schema<IAuthorStats>({
	commits: { type: Schema.Types.Mixed },
	projects: { type: Schema.Types.Mixed },
	gifts: { type: Schema.Types.Mixed },
	nfts: { type: Schema.Types.Mixed },
	age: { type: Schema.Types.Mixed },
	messages: { type: Schema.Types.Mixed },
	warnings: { type: Schema.Types.Mixed },
}, { _id: false });

const AuthorSchema = new Schema<IAuthor>({
	name: { type: String, required: true },
	role: { type: String, required: true },
	quote: { type: String, required: true },
	avatar: { type: String, required: true },
	socials: { type: [SocialSchema], default: [] },
	tags: { type: [String], default: [] },
	stats: { type: AuthorStatsSchema, default: {} },
});

export default mongoose.models.AuthorPage || mongoose.model<IAuthor>('AuthorPage', AuthorSchema, "authorsPage");
