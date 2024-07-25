import { IsString, IsOptional, IsInt, IsUUID } from 'class-validator';

export class UpdateOrderDTO {
  @IsOptional()
  @IsUUID()
  @IsString()
  productId: string;

  @IsOptional()
  @IsUUID()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsString()
  client: string;

  @IsOptional()
  @IsString()
  address: string;
  
  @IsOptional()
  @IsString()
  item?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;
}