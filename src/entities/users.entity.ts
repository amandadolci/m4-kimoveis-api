import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	UpdateDateColumn,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import Schedule from './schedules.entity';
import { getRounds, hashSync } from 'bcryptjs';

@Entity('users')
class User {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ length: 45 })
	name: string;

	@Column({ length: 45, unique: true })
	email: string;

	@Column({ length: 120 })
	password: string;

	@Column({ default: false })
	admin: boolean;

	@CreateDateColumn({ type: 'date' })
	createdAt: string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: string;

	@DeleteDateColumn({ type: 'date', nullable: true })
	deletedAt: string | null;

	@OneToMany(() => Schedule, schedule => schedule.user)
	schedule: Schedule[];

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		const hasRounds: number = getRounds(this.password);
		if (!hasRounds) {
			this.password = hashSync(this.password, 10);
		}
	}
}

export default User;
