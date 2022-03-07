import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

import { EntityIdOption } from "libs/EntityIdOption";

@Entity({ name: "Products" })
export class ProductEntity {
  @PrimaryColumn(new EntityIdOption())
  id: Buffer;

  @Column()
  title: string;

  @Column()
  creatorId: string;

  @Column()
  imageFileId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @VersionColumn()
  version: number;
}
