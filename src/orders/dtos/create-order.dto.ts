import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  client: string;

  @IsNotEmpty()
  @IsString()
  address: string;
  
  @IsNotEmpty()
  @IsString()
  item: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}