import { hashSync } from 'bcryptjs';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Schedule } from './schedule.entity';


@Entity('users')
class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45 })
    name: string

    @Column({ type: 'varchar', length: 45, unique: true })
    email: string

    @Column({ type: 'boolean', default: false })
    admin: boolean

    @Column({ type: 'varchar', length: 120 })
    password: string

    @CreateDateColumn({ type: 'date' })
    createdAt: string | Date

    @UpdateDateColumn({ type: 'date' })
    updatedAt: string | Date

    @DeleteDateColumn({ type: 'date' })
    deletedAt: string | Date

    @OneToMany( () => Schedule, schedule => schedule.user )
    schedules: Schedule[]

    @BeforeInsert()
    hashPassword(): void {
        this.password = hashSync(this.password, 10)
    }
}


export { User }