export class ImageLoaded {
  readonly type = 'LOAD_IMAGE';
  constructor() {}
}

export class PassCheck {
  readonly type = 'PASS_CHECK';
  constructor() {}
}

export class FailCheck {
  readonly type = 'FAIL_CHECK';
  constructor() {}
}

export class StartTest {
  readonly type = 'START_TEST';
  constructor() {}
}

export class StopTest {
  readonly type = 'STOP_TEST';
  constructor() {}
}

export class KnitButtonClicked {
  readonly type = 'START_KNIT';
  constructor() {}
}

export class StopKnit {
  readonly type = 'STOP_KNIT';
  constructor() {}
}

export type GuiEvent = ImageLoaded | PassCheck | FailCheck | StartTest | StopTest | KnitButtonClicked | StopKnit;