import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/common/guard/auth.guard'

export const AuthProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
}
