import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../components/layout/PageHeader'

export function PlayView() {
  const { t } = useTranslation()

  return (
    <PageHeader title={t('play.title')} description={t('play.description')} />
  )
}
