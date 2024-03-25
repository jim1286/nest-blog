import { JwtAuthGuard } from '@/guard';
import { Controller, UseGuards } from '@nestjs/common';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {}
