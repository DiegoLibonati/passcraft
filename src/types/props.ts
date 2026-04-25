interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface OptionCheckboxProps extends DefaultProps {
  id: string;
  label: string;
}

export interface OptionNumberProps extends DefaultProps {
  id: string;
  label: string;
  classNameLabel?: string;
}
