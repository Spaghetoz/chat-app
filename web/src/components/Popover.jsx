import * as RadixPopover from '@radix-ui/react-popover';

/** A generic popover with any component content */
//TODO fix focus blue outline when open
export default function Popover({ trigger, children, side }) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        {trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          className=""
          sideOffset={4}
          collisionPadding={16}
          side={side ?? undefined}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};