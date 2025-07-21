// api-wrapped-response.decorator.ts
import { applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { ApiResponseVo } from '../swagger/api-response.vo'

// 不生效
export function ApiResult<T extends new (...args: any[]) => any>(model: T, isArray = false) {
  return applyDecorators(
    ApiExtraModels(ApiResponseVo, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseVo) },
          {
            properties: {
              data: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  }
                : { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  )
}
