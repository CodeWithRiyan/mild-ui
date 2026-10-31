import * as React from "react";
import { avatarCases } from "@mild-ui/test-cases/avatar";
import { avatarGroupCases } from "@mild-ui/test-cases/avatar-group";
import { runComponentCases } from "../../test-utils/run-cases";
import { Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps } from "./Avatar";

runComponentCases(avatarCases, (c) => <Avatar {...(c.props as AvatarProps)} />);

runComponentCases(avatarGroupCases, (c) => (
  <AvatarGroup {...(c.props as AvatarGroupProps)}>
    <Avatar name="Ada Lovelace" />
    <Avatar name="Grace Hopper" />
    <Avatar name="Alan Turing" />
    <Avatar name="Edsger Dijkstra" />
  </AvatarGroup>
));
