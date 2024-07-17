import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  readonly item: string;

  @IsNotEmpty()
  @IsInt()
  readonly quantity: number;
}