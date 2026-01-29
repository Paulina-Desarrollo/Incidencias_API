import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('CatClaBod')
export class CatClaBod {
  @PrimaryColumn({ name: 'CveClaBod' })
  cveClaBod: number;

  @Column({ name: 'DesClaBod', type: 'varchar', length: 255 })
  desClaBod: string;

  @Column({ name: 'UsuarioAlta', type: 'varchar', length: 100, nullable: true })
  usuarioAlta: string;

  @Column({ name: 'FechaAlta', type: 'datetime', nullable: true })
  fechaAlta: Date;

  @Column({ name: 'UsuarioMod', type: 'varchar', length: 100, nullable: true })
  usuarioMod: string;

  @Column({ name: 'FechaMod', type: 'datetime', nullable: true })
  fechaMod: Date;

  @Column({ name: 'UsuarioBaja', type: 'varchar', length: 100, nullable: true })
  usuarioBaja: string;

  @Column({ name: 'FechaBaja', type: 'datetime', nullable: true })
  fechaBaja: Date;

  @Column({ name: 'CveEstatus', type: 'varchar', nullable: true })
  cveEstatus: string;
}