import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './users.entity';
import RealEstate from './realEstate.entity';

@Entity('schedules')
class Schedule {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({
		type: 'date',
	})
	date: string;

	@Column({
		type: 'time',
	})
	hour: string;

	@ManyToOne(() => RealEstate, realEstate => realEstate.schedules)
	realEstate: RealEstate;

	@ManyToOne(() => User, user => user.schedule)
	user: User;
}

export default Schedule;
