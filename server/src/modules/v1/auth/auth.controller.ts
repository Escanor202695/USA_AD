import { Body, Controller, Delete, Get, HttpCode, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { generate } from 'otp-generator';
import { CreateAuthDto, LoginAuthDto } from './dtos';
import { AccessTokenGuard } from './guards';
import { User } from 'src/common/decorator/user.decorator';
import { AuthUser } from './schema/auth.schema';
import { AdduserAuthDto } from './dtos/adduser.auth.dto';


@ApiTags('v1/auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiCreatedResponse({
    description: 'Create an account with provided data if correct',
  })
  @Post('local/register')
  async register(
    @Body() createAuthDto: CreateAuthDto,
    @Res() response: Response,
  ) {
    const ret = await this.authService.register(createAuthDto, response);
    return response.send(ret);
  }

  @ApiCreatedResponse({
    description: 'Create an account with provided data if correct',
  })
  @UseGuards(AccessTokenGuard)
  @Post('local/addnewuser')
  async addNewUser(
    @Body() createAuthDto: AdduserAuthDto,
    @User() user: AuthUser
  ) {
    if (user.role !== 'admin') {
      return { status: 'error', message: 'You are not authorized to add new user' }
    }
    return await this.authService.addNewUser(createAuthDto);

  }

  @ApiOkResponse({
    description: 'Logs in user',
  })
  @HttpCode(200)
  @Post('local/login')
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() response: Response) {
    const ret = await this.authService.login(loginAuthDto, response);
    return response.send(ret);
  }

  @ApiOkResponse({
    description: 'Logs in user',
  })
  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @Get('local/isloggedin')
  async isloggedin(@Res() response: Response) {
    return response.send({ status: 'success' });
  }

  @ApiOkResponse({
    description: 'User details',
  })
  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @Get('local/userdetails')
  async sentUserDetails(@User() user: AuthUser) {
    return user;
  }


  @ApiOkResponse({
    description: 'Logs in user google one tap',
  })
  @HttpCode(200)
  @Post('local/forgetpassword')
  async forgetPassword(@Body('email') email: string) {
    const ret = await this.authService.forgetPassword(email);
    return { email, status: 'success', message: `An email is sent at ${ret}` };
  }

  @HttpCode(200)
  @Post('local/receiveotp')
  async otpReceive(@Body('email') email: string, @Body('otp') otp: string) {
    const ret = await this.authService.otpReceive(email, otp);
    return { email, status: 'success', message: `Otp is verified` };
  }

  @HttpCode(200)
  @Post('local/newpassword')
  async setNewPassword(@Body('email') email: string, @Body('otp') otp: string, @Body('newpassword') newpassword: string) {
    const ret = await this.authService.setNewPassword(email, otp, newpassword);
    return { email, status: 'success', message: `Password updated successfuly` };
  }

  @HttpCode(200)
  @Post('local/changepassword')
  @UseGuards(AccessTokenGuard)
  async changePassword(@User() user: AuthUser, @Body('password') password: string, @Body('newpassword') newpassword: string) {
    const ret = await this.authService.changePassword(user.email, password, newpassword);
    return { "email": user.email, status: 'success', message: `Password updated successfuly` };
  }


  @ApiOkResponse({
    description: 'Logs out user',
  })
  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @Get('local/logout')
  async logout(@Res() response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return response.send('Cookies cleared');
  }

  @ApiOkResponse({
    description: 'Get all users',
  })
  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @Get('allusers')
  async findAllUser() {
    return this.authService.findAll();
  }

  @ApiOkResponse({
    description: 'user',
  })
  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }

}
