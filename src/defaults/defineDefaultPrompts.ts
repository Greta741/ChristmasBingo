import type { BuiltInPrompt, Language } from '../domain/models'

export type DefaultBuiltInPrompt = Readonly<
  Omit<BuiltInPrompt, 'text'> & {
    text: Readonly<Record<Language, string>>
  }
>

export function defineDefaultPrompts(
  prompts: readonly BuiltInPrompt[],
): readonly DefaultBuiltInPrompt[] {
  return Object.freeze(
    prompts.map((prompt) =>
      Object.freeze({
        ...prompt,
        text: Object.freeze({ ...prompt.text }),
      }),
    ),
  )
}
