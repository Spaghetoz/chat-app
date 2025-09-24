import * as RadixPopover from '@radix-ui/react-popover';

/** A generic popover with any component content */
export default function Popover({ trigger, children }) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        {trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          className=""
          sideOffset={4}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};