import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Address } from './address.entity';
import { Category } from './category.entity';
import { Schedule } from './schedule.entity';


@Entity('real_estate')
class RealEstate {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'boolean', default: false })
    sold: boolean

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    value: number | string

    @Column({ type: 'integer' })
    size: number

    @CreateDateColumn({ type: 'date' })
    createdAt: Date | string

    @UpdateDateColumn({ type: 'date' })
    updatedAt: Date | string

    @OneToOne(() => Address )
    @JoinColumn()
    address?: Address | null | undefined 

    @ManyToOne(() => Category, { nullable: true }, )
    category?: Category | null | undefined

    @OneToMany(() => Schedule, schedule => schedule.realEstate)
    schedules: Schedule[]

}


export { RealEstate }