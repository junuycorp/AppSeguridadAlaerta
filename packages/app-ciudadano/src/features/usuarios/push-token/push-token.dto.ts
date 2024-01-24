import type { Flexible } from '@ciudadano/shared/types'

export class PushTokenDto {
  private constructor(public pushToken: string) {}

  static patch(object: Record<string, unknown>): [string?, PushTokenDto?] {
    const { pushToken } = object as Flexible<PushTokenDto>

    if (pushToken == null) return ['Falta proporcionar pushToken']

    return [undefined, new PushTokenDto(pushToken)]
  }
}
