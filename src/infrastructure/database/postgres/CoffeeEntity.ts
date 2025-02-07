import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RoastLevel, BeanType, ProcessingMethod, CoffeeAttributes } from '../../../core/entities/Coffee';

@Entity({ name: 'coffees' })
export class CoffeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 255 })
  origin: string;

  @Column({ type: 'int', nullable: true })
  altitude?: number;

  @Column({ type: 'enum', enum: RoastLevel })
  roastLevel: RoastLevel;

  @Column({ type: 'enum', enum: BeanType })
  beanType: BeanType;

  @Column({ type: 'enum', enum: ProcessingMethod })
  processingMethod: ProcessingMethod;

  @Column({ type: 'date', nullable: true })
  harvestDate?: Date;

  @Column({ type: 'date', nullable: true })
  roastDate?: Date;

  @Column({ type: 'jsonb' })
  attributes: CoffeeAttributes;

  @Column({ type: 'text', array: true })
  images: string[];

  @Column({ type: 'uuid' })
  sellerId: string;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  reviewCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
