import { IsNotEmpty, IsString } from 'class-validator';

export class InsertBrandDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
  }
}
