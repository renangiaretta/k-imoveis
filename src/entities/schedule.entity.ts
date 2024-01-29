import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { RealEstate } from './realEstate.entity';
import { User } from './user.entity';




@Entity('schedules_users_properties')
class Schedule {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'date'})
    date: Date | string

    @Column({ type: 'time' })
    hour: string

    @ManyToOne( () => RealEstate, (realEstate) => realEstate.schedules )
    realEstate: RealEstate
    
    @ManyToOne( () => User, user => user.schedules  )
    user: User
}

export { Schedule }