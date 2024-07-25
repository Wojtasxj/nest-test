import { IsString, IsNotEmpty, IsInt, IsUUID } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  clientId: string;

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