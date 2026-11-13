import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../components/layout/PageHeader'

export function CreateView() {
  const { t } = useTranslation()

  return (
    <PageHeader
      title={t('create.title')}
      description={t('create.description')}
    />
  )
}
