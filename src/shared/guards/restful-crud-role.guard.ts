import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { getAction } from '@nestjsx/crud'

@Injectable()
export class RestfulCrudRoleGuard implements CanActivate {

  constructor(
    //   private readonly reflector: Reflector,
    public restfulCrudOptions: {
      readAllRoles: string[],
      readOneRoles: string[],
      createOneRoles: string[],
      updateOneRoles: string[],
      deleteOneRoles: string[]
    }
  ) { }

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest()
    const handler = context.getHandler()
    const controller = context.getClass()

    // const feature = getFeature(controller)
    const action = getAction(handler)
    const user = request.user

    switch (action) {
      case 'Read-All': {
        if (this.restfulCrudOptions.readAllRoles.includes(user.role)) {
          return true
        }
        return false
      }

      case 'Read-One': {
        if (this.restfulCrudOptions.readAllRoles.includes(user.role)) {
          return true
        }
        return false
      }

      case 'Create-One': {
        if (this.restfulCrudOptions.readAllRoles.includes(user.role)) {
          return true
        }
        return false
      }

      case 'Update-One': {
        if (this.restfulCrudOptions.readAllRoles.includes(user.role)) {
          return true
        }
        return false
      }

      case 'Delete-One': {
        if (this.restfulCrudOptions.readAllRoles.includes(user.role)) {
          return true
        }
        return false
      }

      default: {
        return false
      }
    }
  }
}